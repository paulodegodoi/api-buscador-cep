const clearForm = () => {
    $('input:not(:first)').each((i, e) => $(e).val(''))
}

const fillForm = (jsonData) => {
    for(const camp in jsonData) {
        if(document.getElementById(''+camp)) {
            document.getElementById(''+camp).value = jsonData[camp]
        }
    }
}

const validCEP = (cep) => cep.length == 8

const searchCEP = async () => {

    clearForm()

    const cep = $('#cep').val().replace(/-/, '')
    const url = `http://viacep.com.br/ws/${cep}/json/`
    if(validCEP(cep)) {
        const data = await fetch(url)
        const jsonData = await data.json()
    
        if(jsonData.hasOwnProperty('erro')) {
            $('#logradouro').val('CEP não encontrado!').css('color', 'red')
        } else {
            fillForm(jsonData)
        }
    } else {
        $('#logradouro').val('CEP inválido!').css('color', 'red')
    }
}

$('#cep').on('focusout', searchCEP)