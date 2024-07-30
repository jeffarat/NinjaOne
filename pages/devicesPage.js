import { Selector, t } from 'testcafe';

class DevicesPage {
    
    constructor () {
        this.mainBox               = Selector('.device-main-box')
        this.deviceInfo            = Selector('.device-info')
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
}

export default new DevicesPage();
