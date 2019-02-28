<template>
    <div id="homepage">
        <ul class="collection with-header">
            <li class="collection-header"><h4>Business Cards</h4></li>
            <!-- TODO: Research v-for function to get better understanding of it -->
            <li v-for="card in cards" v-bind:key="card.id" class="collection-item" id="homepage-card-name">
                <div class="chip">{{card.card_id}}</div>
                <!-- Edge Case if user inputs name with crazy capitalization - looks nice and readable now -->
                {{card.name.charAt(0).toUpperCase()}}{{card.name.slice(1).toLowerCase()}} 
                {{card.surName.charAt(0).toUpperCase()}}{{card.surName.slice(1).toLowerCase()}}
                <!-- TODO: Change route from card_id to name+surName -->
                <router-link class="secondary-content" v-bind:to="{name: 'view-card', params: { card_id: card.card_id}}">
                    View Card
                    <i class="fa fa-eye"></i>
                </router-link>
                </li>
        </ul>
        <router-link to="/new" class="btn-large blue right">
            <i class="fa fa-plus"></i> New Card
        </router-link>
    </div>
</template>

<style>
    #new-card-btn:before{
        content: 'Add Card';
        padding-right: 15px;
        padding-left: 10px;
        margin-right: -8px;
        font-size: 1.5em;
        color: #fff;
        background-color: #2196F3;
        border-radius: 3px;
    }
    .secondary-content{
        color: #2196F3;
    }
</style>


<script>
import db from './firebaseInit'
export default {
    name: 'homepage',
    data() {
        return {
            cards: []
        }
    },
    created () {
        db.firestore().collection('business-cards').orderBy('card_id').get().then(querySnapshot => {
            querySnapshot.forEach( doc => {
                const data = {
                    'id': doc.id,
                    'card_id': doc.data().card_id,
                    'name': doc.data().name,
                    'surName': doc.data().surName,
                    'phone': doc.data().phone,
                    'email': doc.data().email
                }
                this.cards.push(data)
            })
        })
    }
}
</script>
