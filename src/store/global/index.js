import { observable, action } from 'mobx'

class Global {
  @observable
  selectMenuItemKey = sessionStorage.getItem('selectMenuItemKey') ? JSON.parse(sessionStorage.getItem('selectMenuItemKey')) : []

  @action
  changeSelectItemKey = selectMenuItemKey => {
    console.log(selectMenuItemKey)
    sessionStorage.setItem('selectMenuItemKey', JSON.stringify(selectMenuItemKey))
    this.selectMenuItemKey = selectMenuItemKey
}
}
export default new Global()