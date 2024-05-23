import { servicesProduts } from "./services/product-services.js";
import { apagarCard } from "./services/product-services.js";



// CONTAINER DOS PRODUTOS E O FORM QUE ENVIA NOVOS PRODUTOS PARA A LISTA

const productContainer = document.querySelector('[data-product]');
const form = document.querySelector('[data-form]');




// CRIAÇÃO DO ELEMENTO COM OS PRODUTOS
function createElement(nome, preco, image, id) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', id);
    card.innerHTML = `
    
        <img src="${image}" alt="${nome}">
            <p>${nome}</p>
                <div class="preco">
                     <p>R$ ${preco}</p>
                    <button class="btn-delete" id="apagar" data-id="${id}">Delete</button>
                </div>
    

    `
    const lixeira = card.querySelector('#apagar')
    lixeira.addEventListener('click', async() =>{
        const id = card.getAttribute('data-id');
        card.remove()
        await apagarCard(id);//chama a função apagar card
    });


     productContainer.appendChild(card);
    return card;
}





// MOSTRAR NA TELA OS PRODUTOS
const render = async () => {
    try {
        const listAtuali = await servicesProduts.listProduct();

        listAtuali.forEach((produto) => {
            productContainer.appendChild(
                createElement(produto.nome, produto.preco, produto.image, produto.id)
            )


        });


    } catch (error) {
        console.log(error);
    }
};

// PEGAR OS INPUTS DO FORM E ADICIONAR NA LISTA DE PRODUTOS

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const nome = document.querySelector('[data-nome]').value;
    const preco = document.querySelector('[data-preco]').value;
    const image = document.querySelector('[data-image]').value;

    servicesProduts.creatProduct(nome, preco, image).then((res) => console.log(res)).catch((err) => console.log(err))
});





// CHAMANDO A FUNÇÃO QUE MOSTRA A LISTA NA TELA
render();