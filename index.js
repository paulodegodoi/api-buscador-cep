const clearForm = () => {
    $('input:not(:first)').each((i, e) => $(e).val(''))
}

const fillForm = (jsonData) => {
    $('#logradouro').val(jsonData.logradouro).css('color', '')
    $('#bairro').val(jsonData.bairro)
    $('#cidade').val(jsonData.localidade)
    $('#estado').val(jsonData.uf)
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

$('#verify').click(searchCEP)