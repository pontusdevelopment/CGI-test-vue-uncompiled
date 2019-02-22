<template>
    <div id="edit-card">
        <h3>Edit Card</h3>
        <div class="row">
            <!-- TODO: Research submit.prevent -->
            <form @submit.prevent="updateCard" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="card_id" required>
                        <label class="active">Card ID#</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                        <label class="active">First Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="surName" required>
                        <label class="active">Last Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="tel" v-model="phone">
                        <label class="active">Telephone number</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="email" v-model="email">
                        <label class="active">E-mail Address</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <!-- TODO: Stylize button to make it fit rest of app -->
                        <input type="file" @change="onFileSelected">
                        <label class="active">Upload Profile Picture: </label>
                    </div>
                </div>
                <router-link to="/" class="btn grey">Cancel</router-link>
                <button type="submit" class="btn blue">Edit Card</button>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'edit-card',
    data() {
        return {
            card_id: null,
            name: null,
            surName: null,
            phone: null,
            email: null
        }
    },
    beforeRouteEnter(to, from, next) {
        db.firestore().collection('business-cards').where('card_id',
        '==', to.params.card_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm =>{
                    vm.card_id = doc.data().card_id
                    vm.name = doc.data().name
                    vm.surName = doc.data().surName
                    vm.phone = doc.data().phone
                    vm.email = doc.data().email
                })
            })
        })
    },
    methods: {
        updateCard() {
            db.firestore().collection('business-cards').where('card_id', '==', this.$route.params.card_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        card_id: this.card_id,
                        name: this.name,
                        surName: this.surName,
                        phone: this.phone,
                        email: this.email
                    })
                    .then(() =>{ 
                            this.$router.push({name: 'view-card', 
                            params: {card_id: this.card_id}})
                        })  
                    })
            })
        },
        onFileSelected (event) {
            this.profilePicture = event.target.files[0]
            db.storage().ref(this.card_id+'_profilePicture').put(this.profilePicture)
        }
    }
}
</script>