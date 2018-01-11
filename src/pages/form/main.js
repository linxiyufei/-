export default {
        data () {
            return {
                modal1: false,
                 formItem: {
                    input: '',
                    radio: 'male',
                    select: '',
                    radioCycle:'day',
                    textarea: '',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50]
                },
                columns1: [
                    {
                        title: '序号',
                        key: 'number'

                    },
                    {
                        title: '走访点',
                        key: 'address'
                    },
                    {
                        title: '任务要点',
                        key: 'mission'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        icon:"edit"
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        icon:"trash-a"
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                })
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        number: 1,
                        address: '西村幼儿园',
                        mission: '校园周边安全检查',
                        date: '2016-10-03'
                    },
                    {
                        number: 2,
                        address: '西村幼儿园',
                        mission: '校园周边再次安全检查',
                        date: '2016-10-03'
                    }
                    
                ]
            }
        },
        methods: {
            show(index){
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data1[index].name}<br>Age：${this.data1[index].age}<br>Address：${this.data1[index].address}`
                })
            },
            remove (index) {
                this.data1.splice(index, 1);
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
        }
    }