<template>
    <div>
        <form method="post" enctype="multipart/form-data" @submit.prevent="uploadFile">
            <input type="file" name="file" id="file" ref="file">
            <button type="submit" class="btn btn-sm btn-outline-success">Upload</button>
            <div class="mt-3 mb-3" v-if="uploadProgress == true">
                <span class="alert alert-success">Upload Complete</span>
            </div>
        </form>
    </div>
</template>

<script>

export default {
    props: ['any-props-you-require'],

    data() {
        return {
           uploadProgress: false,
        }
    },
    methods: {
        uploadFile() {
            Vapor.store(this.$refs.file.files[0], {
                progress: progress => {
                    setTimeout(() => {
                        this.uploadProgress = Math.round(progress * 100);
                    }, 1000);
                }
            }).then(response => {
                console.log(response);
                axios.post('/api/your/endpoint', {
                    uuid: response.uuid,
                    key: response.key,
                    bucket: response.bucket,
                    name: this.$refs.file.files[0].name,
                    content_type: this.$refs.file.files[0].type,
                });
                this.uploadProgress = true;   
            }).catch((error) => {
                console.log(error);
                alert( error.response.data.errors);
            });
        }
    }
             
};
</script>
