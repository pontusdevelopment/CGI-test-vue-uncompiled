<template>
    <div id="view-card">
        <ul class="collection with-header">
            <li class="collection-header">
                <img src="https://propertymarketersllc.com/wp-content/uploads/2018/05/profile-picture-placeholder.png" class="circle responsive-img" id="profile-picture" alt="Profile Picture">
                <!-- Edge Case if user inputs name with crazy capitalization - looks nice and readable now -->
                <h4>{{name.charAt(0).toUpperCase()}}{{name.slice(1).toLowerCase()}}
                    {{surName.charAt(0).toUpperCase()}}{{surName.slice(1).toLowerCase()}}</h4>
                    
            </li>
            <li class="collection-item">Card ID#: {{card_id}}</li>
            <li class="collection-item">Telephone Number: {{phone}}</li>
            <li class="collection-item">E-mail Address: {{email.toLowerCase()}}</li>
        </ul>
        <router-link to="/" class="btn grey">Back</router-link>
        <button @click="deleteCard" class="btn red right"><i class="far fa-trash-alt"></i> Delete Card</button>
        <router-link v-bind:to="{name: 'edit-card', params: {card_id: card_id}}" 
                                class="btn blue">
                                <i class="fas fa-pencil-alt"></i>
                                Edit Card
        </router-link>

        <!-- <div class="fixed-action-btn" id="edit-card-btn">
            
            </router-link>
        </div> -->
    </div>
</template>

<style>
    li > h4{
        text-transform: capitalize;
    }

    #edit-card-btn:before{
        content: 'Edit Card';
        padding-right: 15px;
        padding-left: 10px;
        margin-right: -8px;
        font-size: 1.5em;
        color: #fff;
        background-color: #2196F3;
        border-radius: 3px;
    }

    #profile-picture{
        border: 2px solid #2196F3;
        height: 90px;
        width: 90px;
    }
</style>

<script>
import db from './firebaseInit'
export default {
    name: 'view-card',
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
    // TODO: Research beforeRouteEnter - specifically the parameters
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

                    db.storage().ref(doc.data().card_id+"_profilePicture").getDownloadURL()
                    .then( url =>{
                        document.getElementById("profile-picture").src = url
                    }).catch( error => {
                        console.log(error)
                    })
                })
            })
        })

        
    },
    methods: {
        deleteCard() {
            if(confirm('Are you sure you want to delete this card?')) {
                db.firestore().collection('business-cards').where('card_id', '==', this.$route.params.card_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                    doc.ref.delete().then(this.$router.push('/'))
                    

                    db.storage().ref(doc.data().card_id+"_profilePicture").delete()
                    .then( () =>{
                        console.log("Image deleted successfully")
                    })
                })
            })
            }
        }
    }
}
</script>
