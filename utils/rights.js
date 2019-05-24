const products = {
    name:"Products",
    url:"/products",
}
const orders = {
    name:"Orders",
    url:"/orders",
}
const rights = {
    admin:[products,orders],
    user:[]
}
module.exports = rights;