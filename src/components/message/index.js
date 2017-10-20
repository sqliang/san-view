/**
 * @file Message实例
 * @author zhanfang(fzhanxd@gmail.com)
 */

import Notification from '../base/notification';

const prefixCls = 'view-message';
const iconPrefixCls = 'view-icon';
const prefixKey = 'view_message_key_';

let defaultDuration = 2;
let top = 50;
let messageInstance;
let name = 1;

const iconTypes = {
    info: 'information-circled',
    success: 'checkmark-circled',
    warning: 'android-alert',
    error: 'close-circled',
    loading: 'load-c'
};

function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance({
        prefixCls: prefixCls,
        styles: {
            top: `${top}px`
        }
    });

    return messageInstance;
}

function notice(content = '', duration = defaultDuration, type, onClose = function () {}, closable = false) {
    const iconType = iconTypes[type];

    // if loading
    const loadCls = type === 'loading' ? ' view-load-loop' : '';

    let instance = getMessageInstance();

    instance.notice({
        name: `${prefixKey}${name}`,
        duration: duration,
        styles: {},
        transitionName: 'move-up',
        content: `
            <div class="${prefixCls}-custom-content ${prefixCls}-${type}">
                <i class="${iconPrefixCls} ion-${iconType}${loadCls}"></i>
                <span>${content}</span>
            </div>
        `,
        onClose: onClose,
        closable: closable,
        type: 'message'
    });

    // 用于手动消除
    return (function () {
        let target = name++;

        return function () {
            instance.remove(`${prefixKey}${target}`);
        };
    })();
}

export default {
    name: 'Message',

    info(options) {
        const type = typeof options;
        if (type === 'string') {
            options = {
                content: options
            };
        }

        return notice(options.content, options.duration, 'info', options.onClose, options.closable);
    },
    success(options) {
        const type = typeof options;
        if (type === 'string') {
            options = {
                content: options
            };
        }

        return notice(options.content, options.duration, 'success', options.onClose, options.closable);
    },
    warning(options) {
        const type = typeof options;
        if (type === 'string') {
            options = {
                content: options
            };
        }

        return notice(options.content, options.duration, 'warning', options.onClose, options.closable);
    },
    error(options) {
        const type = typeof options;
        if (type === 'string') {
            options = {
                content: options
            };
        }

        return notice(options.content, options.duration, 'error', options.onClose, options.closable);
    },
    loading(options) {
        const type = typeof options;
        if (type === 'string') {
            options = {
                content: options
            };
        }

        return notice(options.content, options.duration, 'loading', options.onClose, options.closable);
    },
    config(options) {
        if (options.top) {
            top = options.top;
        }

        if (options.duration) {
            defaultDuration = options.duration;
        }

    },
    destroy() {
        let instance = getMessageInstance();
        messageInstance = null;
        instance.destroy('view-message');
    }
};
