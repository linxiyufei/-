<template>
    <Modal
        v-model="modal3"
        title=""
        @on-ok="ok"
        @on-cancel="cancel">
        <p>确认删除吗</p>
    </Modal>
</template>

<script>
import axios from 'axios'

export default {
		props: [''],
	data () {
		return {
            modal3: false
        }
	},
    methods:{
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        }
    },
    mounted: function() {

    }
}
</script>

<style>

</style>