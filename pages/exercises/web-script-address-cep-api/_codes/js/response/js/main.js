const loadingField = document.querySelector('img#loading')
const formField = document.querySelector('form')
const CEP = document.querySelector('#cep')
const CEPERROR = document.querySelector('#cepError')
const RUA = document.querySelector('#Rua')
const NUMERO = document.querySelector('#Número')
const BAIRRO = document.querySelector('#Bairro')
const CIDADE = document.querySelector('#Cidade')
const ESTADO = document.querySelector('#Estado')

CEP.addEventListener('focus', () => {
  cleanCepError()
})

CEP.addEventListener('blur', () => {
  let cep = CEP.value

  if (/\d{5}-?\d{3}/.test(cep)) {
    loadCepInfo(cep)
  } else {
    showCepError()
  }
})

function loadCepInfo(cep) {
  loadingField.classList.toggle('hidden')
  formField.classList.toggle('loading')
  let url = `https://viacep.com.br/ws/${cep}/json/`
  fetch(url)
    .then(res => res.json())
    .then(cepInfo => {
      if(cepInfo.erro) {
        cleanAddressFields()
      } else {
        formField.classList.toggle('loading')
        loadingField.classList.toggle('hidden')
        RUA.value = cepInfo.logradouro
        BAIRRO.value = cepInfo.bairro
        CIDADE.value = cepInfo.localidade
        ESTADO.value = cepInfo.uf
  
        NUMERO.focus()
        cleanCepError()
      }
    })
    .catch(error => {
      showCepError()
    })
}

function cleanCepError() {
  CEP.classList.remove('input-cep-error')
  CEPERROR.classList.add('hidden')
}

function showCepError() {
  CEP.classList.add('input-cep-error')
  CEPERROR.classList.remove('hidden')
  cleanAddressFields()
}

function cleanAddressFields() {
  RUA.value = ''
  NUMERO.value = ''
  BAIRRO.value = ''
  CIDADE.value = ''
  ESTADO.value = ''
}