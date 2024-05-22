const listProduct = () => {
    return fetch('http://localhost:3000/products')
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const creatProduct = (nome, preco, image) => {
    return fetch('http://localhost:3000/products' , {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome,
            preco,
            image,
        })
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}


const deleteProduct = (id) => {
    return fetch(`http://localhost:3000/products/${id}`,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            id,
        })
    
    })
}

export const servicesProduts = {
    listProduct,
    creatProduct,
}
