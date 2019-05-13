import { observable, action } from 'mobx'

class Global {
  @observable
  count = 1

  @action
  setCount = () => {
    return ++this.count
  }
}
export default new Global()