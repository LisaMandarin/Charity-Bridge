export function getAge(birthday) {
    const newBirthday = new Date(birthday)
    const today = new Date()
  
    const yearDiff = today.getFullYear() - newBirthday.getFullYear()
    const notYetBday = () => {
      if (today.getMonth() < newBirthday.getMonth()) {
        return 1
      } else if (today.getMonth() === newBirthday.getMonth() && today.getDate() < newBirthday.getDate()) {
        return 1
      } else {
        return 0
      } 
    }
  
    const age = yearDiff - notYetBday()
    return age
  }

export const dateFormat = 'YYYY-MM-DD'

export function onBirthdayChange (date, form) {
    if (date) {
        const age = getAge(date.format(dateFormat))
        form.setFieldsValue({age})
    } else {
        form.setFieldsValue({age: 0})
    }
}

export function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth()+1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${date}`
    return formattedToday
}

export function onReset (form) {
  form.resetFields()
}