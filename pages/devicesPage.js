import { Selector, t } from 'testcafe';

class DevicesPage {
    
    constructor () {
        this.mainBox               = Selector('.device-main-box')
        this.deviceInfo            = '.device-info'
        this.deviceName            = Selector('.device-name')
        this.deviceType            = Selector('span.device-type')
        this.deviceCapacity        = Selector('span.device-capacity')
        this.addDevice             = Selector('a.submitButton')
        this.deviceDeleteButton    = this.mainBox.find('button[class="device-remove"]')
        this.deviceEditButton      = this.mainBox.find('a.device-edit')

    }
    getDynamicEditButton(id) {
      return Selector(`a[href$='${id}']`);
    }
    getDeviceInfoById(id) {
      return Selector(`a[href$='${id}']`).parent().prevSibling(this.deviceInfo);
    }
}

export default new DevicesPage();
