import Vue from 'vue';
import   MessageBox from './MessageBox'
export var messageBox=(function () {
    var defaults={
        title:'',
        content:'',
        cancel:'',
        ok:'',
        handleCanel:null,
        handleOk:null
    };
    return function (opts) {
        for(var attr in defaults){
            defaults[attr]=opts[attr];
        }
        var myComponent=Vue.extend(MessageBox);
        var vm =new myComponent({
            el:document.createElement('div'),
            data:{
                title:defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok:defaults.ok
            },
            methods:{
                handleCanel(){
                    console.log(222);
                    defaults.handleCanel&&defaults.handleCanel.call(this);
                    document.body.removeChild(vm.$el);
                },
                handleOk(){
                    console.log(1111);
                    defaults.handleOk&&defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el);
                }
            }
        });
        document.body.appendChild(vm.$el);
    };
})();