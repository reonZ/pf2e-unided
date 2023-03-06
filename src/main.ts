import { setModuleID } from '@utils/module'
import { getSetting, registerSetting } from '../../../../../foundryVTT-projects/@utils/foundry/settings'

export const MODULE_ID = 'pf2e-unided'
setModuleID(MODULE_ID)

Hooks.on('init', () => {
    registerSetting({
        name: 'create',
        config: true,
        type: Boolean,
        default: true,
        onChange: setCreateHook,
    })

    registerSetting({
        name: 'update',
        config: true,
        type: Boolean,
        default: true,
        onChange: setUpdateHook,
    })
})

Hooks.on('ready', () => {
    setCreateHook(getSetting('create'))
    setUpdateHook(getSetting('update'))
})

function setCreateHook(value: boolean) {
    Hooks[value ? 'on' : 'off']('preCreateItem', onPreCreateItem)
}

function setUpdateHook(value: boolean) {
    Hooks[value ? 'on' : 'off']('preUpdateItem', onPreUpdateItem)
}

function onPreCreateItem(item: Item) {
    const itemPF2e = item as ItemPF2e
    if (!item.img || !itemPF2e.isOfType('physical')) return
    itemPF2e._source.system.identification.unidentified.img = item.img
}

function onPreUpdateItem(item: Item, changes: DocumentUpdateData<ItemPF2e>) {
    if (!(item as ItemPF2e).isOfType('physical') || !('img' in changes)) return
    setProperty(changes, 'system.identification.unidentified.img', changes.img)
}
