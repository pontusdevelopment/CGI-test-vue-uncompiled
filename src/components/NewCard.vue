<template>
    <div id="new-card">
        <h3>New Card</h3>
        <div class="row">
            <!-- TODO: Research submit.prevent -->
            <form @submit.prevent="saveCard" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="card_id" required>
                        <label>Card ID#*</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                        <label>First Name*</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="surName" required>
                        <label>Last Name*</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="tel" 
                        v-model="phone"
                        pattern="[0-9]{10}">
                        <label>Telephone number (10 digits)</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="email" v-model="email">
                        <label>E-mail Address</label>
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
                <button type="submit" class="btn blue">Add Card</button>
            </form>
            <button @click="handleSize">Click Me</button>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'new-card',
    data() {
        return {
            card_id: null,
            name: null,
            surName: null,
            phone: null,
            email: null,
            profilePicture: null
        }
    },
    methods:{
        saveCard() {
            db.firestore().collection('business-cards').add({
                card_id: this.card_id,
                name: this.name,
                surName: this.surName,
                phone: this.phone,
                email: this.email
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))

            db.storage().ref(this.card_id+'_profilePicture').put(this.profilePicture)
            .then(snapshot => {
                console.log("uploaded photo")
            })
        },
        onFileSelected (event) {
            this.profilePicture = event.target.files[0]
            var reader = new FileReader
            reader.readAsDataURL(this.profilePicture)
            reader.onloadend = function(){
                this.profilePicture = reader.result
                console.log(this.profilePicture)
            }
        },
        handleSize() {
            db.firestore().collection('business-cards').get()
            .then(snapshot => {
                console.log(snapshot.size)
            })
        }
    }
}
</script>
