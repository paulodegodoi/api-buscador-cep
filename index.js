const clearInfo = () => {
    document.getElementById('logradouro').value = ''
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = ''
}

const fillCEP = (address) => {
    document.getElementById('logradouro').value = address.logradouro
    document.getElementById('bairro').value = address.bairro
    document.getElementById('cidade').value = address.localidade
    document.getElementById('estado').value = address.uf
}

const cepValido = (cep) => cep.length == 8

const searchCEP = async () => {
    
    clearInfo()

    const cep = document.getElementById('cep').value
    const apiCEP = `http://viacep.com.br/ws/${cep}/json/`
    
    if (cepValido(cep)) {
        const data = await fetch(apiCEP)
        const address = await data.json()

        if (address.hasOwnProperty('erro')) {
            document.getElementById('logradouro').value = 'CEP não encontrado!'
        } else fillCEP(address)
    } else document.getElementById('logradouro').value = 'CEP inválido!'

}

document.getElementById('cep').addEventListener('focusout', searchCEP)