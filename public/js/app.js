console.log('java script no front-end');



const cotacoesForm = document.querySelector('form')
const mainMessage = document.querySelector('h3')

const nomeAtivo     = document.querySelector('#name')
const descAtivo     = document.querySelector('#company_name')
const precoAtivo    = document.querySelector('#price')
const regiaoAtivo   = document.querySelector('#region')

cotacoesForm.addEventListener('submit', (event) => {
    mainMessage.innerHTML = 'Buscando...'
    nomeAtivo.innerHTML   = ''
    descAtivo.innerHTML   = ''
    precoAtivo.innerHTML  = ''
    regiaoAtivo.innerHTML = ''
    
    event.preventDefault()
    const ativo = document.querySelector('input').value
    console.log('Ativo:' + ativo)

    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((response) => {

            setTimeout(() => {
                if (response.error) {
                    console.log(`${response.error.code}-${response.error.message}`)
                    mainMessage.innerHTML = `${response.error.code} - ${response.error.message}`
                } else {
                    console.log(response.name);
                    mainMessage.innerHTML = 'Resultado obtido:'
                    nomeAtivo.innerHTML   = `Ativo: ${response.name}`
                    descAtivo.innerHTML   = `Des: ${response.company_name}`
                    precoAtivo.innerHTML  = `Preco: ${response.price}`
                    regiaoAtivo.innerHTML = `Região: ${response.region}`
                }
               
            },1000)
            

        })
    })
    
})


