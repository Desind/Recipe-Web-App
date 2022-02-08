import React, {useEffect} from 'react';
import styles from "./adminPanel.module.scss"
import {useGlobalState} from "../../state";
import { useHistory } from "react-router-dom";
import { endpoints } from "../../api/endpoints";
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from "@material-ui/core/Tooltip";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AlertDialog from "../../components/alertDialog";
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import _ from "lodash";
import FormButton from "../../components/FormButton";
import {toast} from "react-toastify";
import Pagination from "@mui/material/Pagination";

export default function AdminPanel(){

    let history = useHistory();

    let [activeTab, setActiveTab] = React.useState("users");
    let [dialogOpen, setDialogOpen] = React.useState(false);
    let [selectedUser, setSelectedUser] = React.useState(null);
    let [selectedUsername, setSelectedUsername] = React.useState(null);

    let [fetchedUsers, setFetchedUsers] = React.useState([]);
    let [fetchedRecipes, setFetchedRecipes] = React.useState([]);

    //input
    let [queryInput, setQueryInput] = React.useState("");
    let [queryRoles, setQueryRoles] = React.useState("ADMIN,USER");
    let [recipeQuery, setRecipeQuery] = React.useState("");
    let [emailQuery, setEmailQuery] = React.useState("");


    let [scanProduct, setScanProduct] = React.useState("");
    let [scanProductPage, setScanProductPage] = React.useState("1");
    let [scannedProducts, setScannedProducts] = React.useState([]);

    let [allProductsSearch, setAllProductsSearch] = React.useState("");
    let [allProducts, setAllProducts] = React.useState([]);
    let [allProductsPageCount, setAllProductsPageCount] = React.useState(0);
    let [allProductsPage, setAllProductsPage] = React.useState(1);

    let [newProductEAN, setNewProductEAN] = React.useState("");
    let [newProductName, setNewProductName] = React.useState("");


    const token = useGlobalState('token')[0];
     const role = useGlobalState('userRole')[0];
    const email = useGlobalState('email')[0];

    function fetchUsers(username, roles){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(endpoints.adminGetUsers+"?username="+username+"&role="+roles, requestOptions)
            .then(response => response.json())
            .then(result => setFetchedUsers(_.sortBy(result,["registrationDate"])));
    }

    function fetchRecipes(name, owner){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(endpoints.adminGetRecipes+"?name="+name+"&email="+owner, requestOptions)
            .then(response => response.json())
            .then(result => setFetchedRecipes(_.sortBy(result,["creationDate"])));
    }

    async function patchRole(email, role){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "userRole": role
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(endpoints.adminChangeRole, requestOptions);
        fetchUsers(queryInput,queryRoles);
    }



    async function deleteUser(id){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(endpoints.adminDeleteUser+"?id="+id, requestOptions);
        fetchUsers(queryInput,queryRoles);
    }

    async function deleteRecipe(id){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(endpoints.adminDeleteRecipe+id, requestOptions);
        fetchRecipes(recipeQuery,emailQuery);
    }

    function parseISOTime(time){
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if (s < 10) {
            s = '0' + s;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (h < 10) {
            h = '0' + h;
        }

        return year + '-' + month + '-' + dt + " " + h + ":" + m + ":" + s;
    }

    function scanProducts(cont = false){
        var requestOptions = {
            method: 'GET'
        };
        let scanPage = scanProductPage;
        if(cont === false){
            setScannedProducts([]);
            setScanProductPage(1);
        }else{
            setScanProductPage(scanProductPage+1);
            scanPage++;
        }

        fetch("https://thingproxy.freeboard.io/fetch/" +
            "http://www.frisco.pl/app/commerce/api/v1/offer/products/query?pageIndex="
            +scanPage+"&search="+scanProduct+"&pageSize=10&language=en", requestOptions)
            .then(response => response.json())
            .then(result => {
                result.products.map((item) => {
                    let newProduct = {
                        "ean": item.product.ean,
                        "name": item.product.name.en
                    }
                    setScannedProducts(scannedProducts => [...scannedProducts, newProduct])
                })
            })
            .catch(error => console.log('error', error));
    }

    function addNewProduct(ean, name){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "ean": ean,
            "name": name
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(endpoints.newProduct, requestOptions)
            .then(response => {
                if(response.status === 201){
                    toast.success("Product added successfully", {
                        position: "bottom-left",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }else{
                    if(response.status === 401){
                        toast.info("Product already exists", {
                            position: "bottom-left",
                            autoClose: 8000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }
            })
    }

    function fetchProducts(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(endpoints.allProducts + "name="+allProductsSearch+"&page="+allProductsPage+"&pageSize=20", requestOptions)
            .then(response => {
                if(response.status === 200){
                    return response.json();
                }else{
                    return {"products":[]};
                }
            })
            .then(json => {
               setAllProductsPageCount(json.pageCount);
               setAllProducts(json.products);
            })

    }

    function deleteProduct(ean){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(endpoints.deleteProduct + ean, requestOptions)
            .then(response => {
                if(response.status === 200){
                    toast.success("Product deleted successfully", {
                        position: "bottom-right",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                fetchProducts();
            })
    }

    useEffect(() => {
        if(role !== "ADMIN"){
            history.replace("/");
        }
        fetchUsers(queryInput,queryRoles);
        fetchRecipes(recipeQuery,emailQuery);
    },[])
    useEffect(() => {
        if(role !== "ADMIN"){
            history.replace("/");
        }
        fetchProducts();
    },[allProductsPage])


    return(
        <>
            <AlertDialog
                title={"Delete user - " + selectedUsername + "?"}
                description={"This operation cannot be undone"}
                open={dialogOpen}
                onAction={() => {
                    deleteUser(selectedUser);
                    setDialogOpen(false);
                    setSelectedUser(null);
                }}
                actionName={"Delete"}
                onClose={() => {
                    setDialogOpen(false);
                    setSelectedUser(null);
                }}
            />
            <div className={styles.wrapper}>
                <div className={styles.wrapperLeft}>
                    <h1 className={styles.header}>Admin panel</h1>
                    <div
                        className={activeTab === "users" ? styles.tabButtonActive : styles.tabButton}
                        onClick={() => {
                            setActiveTab("users");
                        }}
                    >Users</div>
                    <div
                        className={activeTab === "recipes" ? styles.tabButtonActive : styles.tabButton}
                        onClick={() => {
                            setActiveTab("recipes");
                        }}
                    >Recipes</div>
                    <div
                        className={activeTab === "addProducts" ? styles.tabButtonActive : styles.tabButton}
                        onClick={() => {
                            setActiveTab("addProducts");
                        }}
                        >Scan for products online</div>
                    <div
                        className={activeTab === "newProduct" ? styles.tabButtonActive : styles.tabButton}
                        onClick={() => {
                            setActiveTab("newProduct");
                        }}
                    >Add product</div>
                    <div
                        className={activeTab === "products" ? styles.tabButtonActive : styles.tabButton}
                        onClick={() => {
                            setActiveTab("products");
                            fetchProducts();
                        }}
                        >Available products</div>
                </div>
                <div className={styles.wrapperRight}>
                    {activeTab === "users" &&
                        <div className={styles.content}>
                            <div className={styles.searchBar}>
                                <div className={styles.inputLabel}>Username</div>
                                <div className={styles.inputLabel}>User roles</div>
                            </div>
                            <div className={styles.searchBar}>
                                <input className={styles.input} value={queryInput} onChange={(e) => {setQueryInput(e.target.value)}}/>
                                <select className={styles.input} value={queryRoles} defaultValue={"USER,ADMIN"} onChange={(e) => {setQueryRoles(e.target.value)}}>
                                    <option value={"USER,ADMIN"}>Any</option>
                                    <option value={"ADMIN"}>Admin</option>
                                    <option value={"USER"}>User</option>
                                </select>
                                <button onClick={() => {
                                    fetchUsers(queryInput,queryRoles);
                                }} className={styles.searchButton}><SearchIcon/></button>
                            </div>
                            <div className={styles.userHeader}>
                                <div className={styles.username}>Username</div>
                                <div className={styles.email}>Email</div>
                                <div className={styles.registrationDate}>Registration date</div>
                                <div className={styles.recipes}>Recipes created</div>
                                <div className={styles.role}>User role</div>
                                <div className={styles.actions}>Actions</div>
                            </div>
                            {fetchedUsers.map((item,id) => {
                                return(
                                    <div key={id} className={styles.user}>
                                        <div className={styles.username}>{item.username}</div>
                                        <div className={styles.email}>{item.email}</div>
                                        <div className={styles.registrationDate}>{parseISOTime(item.registrationDate)}</div>
                                        <div className={styles.recipes}>{item.recipesCreated}</div>
                                        <div className={styles.role}>{item.userRoles}</div>
                                        <div className={styles.actions}>
                                            <Tooltip title={<p className={styles.tooltip}>List recipes</p>}>
                                                <FormatListBulletedIcon onClick={() => {
                                                    setEmailQuery(item.email);
                                                    setRecipeQuery("");
                                                    setActiveTab("recipes");
                                                    fetchRecipes("", item.email);
                                                }} style={{cursor: "pointer"}}/>
                                            </Tooltip>
                                            {item.email != email && <>
                                                {(item.userRoles == "ADMIN") ?
                                                    <Tooltip title={<p className={styles.tooltip}>Demote to user</p>}>
                                                        <VerifiedUserIcon onClick={() => {
                                                            patchRole(item.email, "USER");
                                                        }} style={{cursor: "pointer"}}/>
                                                     </Tooltip> :
                                                    <Tooltip title={<p className={styles.tooltip}>Give admin permission</p>}>
                                                        <PersonIcon onClick={() => {
                                                            patchRole(item.email, "ADMIN");
                                                        }} style={{cursor: "pointer"}}/>
                                                    </Tooltip>
                                                }
                                                <Tooltip title={<p className={styles.tooltip}>Delete user</p>}>
                                                    <CloseIcon
                                                        onClick={() => {
                                                            setDialogOpen(true);
                                                            setSelectedUser(item.id);
                                                            setSelectedUsername(item.username);
                                                        }}
                                                        style={{cursor: "pointer"}}
                                                    />
                                                </Tooltip>
                                            </>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    }
                    {activeTab === "recipes" &&
                        <div className={styles.content}>
                            <div className={styles.searchBar}>
                                <div className={styles.inputLabel}>Recipe name</div>
                                <div className={styles.inputLabel}>Author email</div>
                            </div>
                            <div className={styles.searchBar}>
                                <input value={recipeQuery} className={styles.input} onChange={(e) => {
                                    setRecipeQuery(e.target.value);
                                }}/>
                                <input value={emailQuery} className={styles.input} onChange={(e) => {
                                    setEmailQuery(e.target.value);
                                }}/>
                                <button onClick={() => {
                                    fetchRecipes(recipeQuery,emailQuery);
                                }} className={styles.searchButton}><SearchIcon/></button>
                            </div>
                            <div className={styles.userHeader}>
                                <div className={styles.recipeNameTitle}>Recipe name</div>
                                <div className={styles.author}>Author</div>
                                <div className={styles.creationDate}>Creation date</div>
                                <div className={styles.actions}>Actions</div>
                            </div>
                            {fetchedRecipes.map((item, key) => {
                                return(
                                    <div className={styles.user}>
                                        <div onClick={() => {history.push("/recipe/"+item.id)}} className={styles.recipeName}>{item.title}</div>
                                        <div className={styles.author}>{item.ownerUsername}</div>
                                        <div className={styles.creationDate}>{parseISOTime(item.creationDate)}</div>
                                        <div className={styles.actions}>
                                            <Tooltip title={<p className={styles.tooltip}>Delete recipe</p>}>
                                                <CloseIcon
                                                    onClick={() => {
                                                        deleteRecipe(item.id);
                                                    }}
                                                    style={{cursor: "pointer"}}
                                                />
                                            </Tooltip>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    {activeTab === "addProducts" &&
                        <div className={styles.content}>
                            <div className={styles.searchBar}>
                                <div className={styles.inputLabel}>Product name or EAN</div>
                            </div>
                            <div className={styles.searchBar}>
                                <input value={scanProduct} className={styles.input} onChange={(e) => {
                                    setScanProduct(e.target.value);
                                }}/>
                                <div/>
                                <button onClick={() => {
                                    scanProducts();
                                }} className={styles.searchButton}><SearchIcon/></button>
                            </div>
                            <div className={styles.userHeader}>
                                <div className={styles.ean}>EAN</div>
                                <div className={styles.productName}>Name</div>
                                <div className={styles.actions}>Actions</div>
                            </div>
                            {scannedProducts.map((item,key) => {
                                return(
                                    <div className={styles.user}>
                                        <div className={styles.ean}>{item.ean}</div>
                                        <div className={styles.productName}>{item.name}</div>
                                        <div className={styles.actions}>
                                            <Tooltip title={<p className={styles.tooltip}>Add product</p>}>
                                                <AddIcon
                                                    onClick={() => {
                                                        addNewProduct(item.ean, item.name);
                                                    }}
                                                    style={{cursor: "pointer"}}
                                                />
                                            </Tooltip>
                                        </div>
                                    </div>
                                )
                            })}
                            {scannedProducts.length > 0 && <FormButton text={"Load 10 more"} onClick={() => {
                                setScanProductPage(scanProductPage+1);
                                scanProducts(true);
                            }}/>}
                        </div>
                    }
                    {activeTab === "products" &&
                        <div className={styles.content}>
                            <div className={styles.searchBar}>
                                <div className={styles.inputLabel}>Product name</div>
                            </div>
                            <div className={styles.searchBar}>
                                <input value={allProductsSearch} className={styles.input} onChange={(e) => {
                                    setAllProductsSearch(e.target.value);
                                }}/>
                                <div/>
                                <button onClick={() => {
                                    fetchProducts();
                                }} className={styles.searchButton}><SearchIcon/></button>
                            </div>
                            <div className={styles.userHeader}>
                                <div className={styles.ean}>EAN</div>
                                <div className={styles.productName}>Name</div>
                                <div className={styles.actions}>Actions</div>
                            </div>
                            {allProducts.map((item,key) => {
                                return(
                                    <div className={styles.user}>
                                        <div className={styles.ean}>{item.ean}</div>
                                        <div className={styles.productName}>{item.name}</div>
                                        <div className={styles.actions}>
                                            <Tooltip title={<p className={styles.tooltip}>Delete product</p>}>
                                                <ClearIcon
                                                    onClick={() => {
                                                        deleteProduct(item.ean);
                                                    }}
                                                    style={{cursor: "pointer"}}
                                                />
                                            </Tooltip>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className={styles.paginationWrapper}>
                                {allProductsPageCount>1 && <Pagination onChange={(e,v) => {
                                    setAllProductsPage(v);
                                }} style={{marginTop: "30px", marginBottom:"0px"}} size="large" shape="rounded" count={allProductsPageCount} />}
                            </div>
                        </div>
                    }
                    {activeTab === "newProduct" &&
                        <div className={styles.content}>
                            <h2 className={styles.newProductTitle}>New product</h2>
                            <div className={styles.newProductInputWrapper}>
                                <div className={styles.inputLabelNewProduct}>EAN</div>
                                <input value={newProductEAN} className={styles.input} onChange={(e) => {
                                    setNewProductEAN(e.target.value);
                                }}/>
                                <div className={styles.inputLabelNewProduct}>Product name</div>
                                <input value={newProductName} className={styles.input} onChange={(e) => {
                                    setNewProductName(e.target.value);
                                }}/>
                                <FormButton text={"Add product"} onClick={() => {
                                    addNewProduct(newProductEAN,newProductName);
                                    setNewProductName("");
                                    setNewProductEAN("");
                                }}/>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </>
    )
}
