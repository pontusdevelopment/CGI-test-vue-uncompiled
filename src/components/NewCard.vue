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
                <p>TEST</p>
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
    // Name = the ID for parent div above to export
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
            // Save business card to firebase, firebase variable name as key, Vue variable as value (same names for simplicity)
            db.firestore().collection('business-cards').add({
                card_id: this.card_id,
                name: this.name,
                surName: this.surName,
                phone: this.phone,
                email: this.email
            })
            // Go back to homepage when card has been saved to database and a promise has returned
            .then(docRef => this.$router.push('/'))
            // Catch any errors if they appear
            .catch(error => console.log(error))

            // Separate function to save profile picture as it is saved in FireStore. Could change to Base64 and save in firebase above
            db.storage().ref(this.card_id+'_profilePicture').put(this.profilePicture)
            .then(snapshot => {
                console.log("uploaded photo")
            })
        },
        onFileSelected (event) {
            this.profilePicture = event.target.files[0]

            // Below code is a test if I wanted to implement reading the file as Base64 instead. Decided not to use it.+
            // var reader = new FileReader
            // reader.readAsDataURL(this.profilePicture)
            // reader.onloadend = function(){
            //     this.profilePicture = reader.result
            //     console.log(this.profilePicture)
            // }
        },
        // Method that I wanted to create in order to set an automatic ID based on the position in the database
        // Does not work that way with FireBase, so the best solution IMO for this is to create a FB-method to handle this logic
        // I.E - not useful at the moment, but perhaps a TODO for setting up an API where that logic takes place
        handleSize() {
            db.firestore().collection('business-cards').get()
            .then(snapshot => {
                console.log(snapshot.size)
            })
        }
    }
}
</script>
