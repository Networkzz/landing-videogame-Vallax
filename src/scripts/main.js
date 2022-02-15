const dateFooter = document.getElementById('dateFooter')

const getDate = () => {
  dateFooter.innerHTML = new Date().getFullYear()
}

getDate();