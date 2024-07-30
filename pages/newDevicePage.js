import { Selector, t } from 'testcafe';


class NewDevicePage {
    constructor () {
        this.mainBox                = Selector('.device-main-box')
        this.systemName             = Selector('#system_name');
        this.hddCapacity            = Selector('#hdd_capacity');
        this.typeDeviceSelect       = Selector('#type');
        this.typeDeviceSelectOption = this.typeDeviceSelect.find('option');
        this.saveButton             = Selector('button.submitButton');
    }
}

export default new NewDevicePage();
