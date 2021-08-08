<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <!-- Tweet Input -->
      <div class="q-py-lg q-px-sm row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            class="new-tweet"
            bottom-slots
            autogrow
            v-model="newTweetContent"
            placeholder="Whats up?"
            counter
            maxlength="285"
          >
            <template v-slot:before>
              <q-avatar
                size="xl"
              >
                <img src="https://cdn.quasar.dev/img/avatar5.jpg">
              </q-avatar>
            </template>
          </q-input>
        </div>

        <div class="col col-shrink">
          <q-btn
            @click="addNewTweet"
            class="q-mb-lg"
            unelevated
            rounded
            no-caps
            :disable="!newTweetContent"
            color="primary"
            label="Tweet"
          />
        </div>
      </div>
      
      <q-separator 
        size="10px"
        color="grey-2 section-separator"
      />

      <!-- List of tweets -->
      <q-list separator>

        <!-- Transition Animation -->
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item
            v-for="tweet in tweets" :key="tweet.id"
            class="q-py-md tweet"
          >
            <q-item-section
              avatar
              top
            >
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label
                class="text-subtitle1"
              >
                <strong>Mateusz Grzywna </strong>
                <span class="text-grey-7">@mateusz__grzywna</span>
                <br class="lt-md">
                <span class="text-grey-7"> &bull; {{ relativeDate(tweet.date) }}</span>
                  
              </q-item-label>
              <q-item-label
                class="tweet-content text-body1"
              >
                {{ tweet.content }}
              </q-item-label>
              <div class="qweet-icons row justify-between q-mt-sm">
                <q-btn
                  class=""
                  flat
                  round
                  color="grey"
                  icon="far fa-comment"
                  size="sm"
                />
                <q-btn
                  class=""
                  flat
                  round
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                />
                <q-btn
                  @click="changeLikeStatus(tweet)"
                  class=""
                  flat
                  round
                  :color="tweet.liked ? 'red' : 'grey'"
                  :icon="tweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                  size="sm"
                />
                <q-btn
                  @click="deleteTweet(tweet)"
                  class=""
                  flat
                  round
                  color="grey"
                  icon="fas fa-trash"
                  size="sm"
                />                            
              </div>
            </q-item-section>
          </q-item>

        </transition-group>
      </q-list>   
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from 'src/boot/firebase.js';
// import { collection, addDoc } from "firebase/firestore"; 
import { defineComponent } from 'vue';
import { formatDistance } from 'date-fns';



export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      newTweetContent: '',
      tweets: [
        // {
        //   id: 'ID1',
        //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis architecto quidem blanditiis sunt laudantium rem, nulla nobis facere ad sapiente harum tenetur, obcaecati dolor, reprehenderit assumenda adipisci fugit et mollitia.',
        //   date: 1627426126469,
        //   liked: false
        // },
        // {
        //   id: 'ID2',
        //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis architecto quidem blanditiis sunt laudantium.',
        //   date: 1627426176995,
        //   liked: true
        // },        
      ]
    }
  },
  methods: {
    changeLikeStatus(tweet) {
      console.log(tweet);
      const tweetId = tweet.id;

      var tweetChangedLikes = db.collection("tweets").doc(tweetId);

      return tweetChangedLikes.update({
          liked: !tweet.liked
      })
      .then(() => {
          console.log("Document successfully updated!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

    },
    relativeDate(value) {
      return formatDistance(value, new Date());
    },
    addNewTweet() {
      let newTweet = {
        content: this.newTweetContent,
        date: Date.now(),
        liked: false
      }

      db.collection("tweets").add(newTweet)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

      this.newTweetContent = '';
    },
    deleteTweet(tweet) {
      // const indexOfTweet = this.tweets.indexOf(tweet);
      // const dateOfDeleted = tweet.date;
      // const indexOfTweet = this.tweets.findIndex(tweet => tweet.date === dateOfDeleted)

      db.collection("tweets").doc(tweet.id).delete().then(() => {
          console.log("Document successfully deleted!");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
    }
  },
  mounted() {
    db.collection("tweets").orderBy('date').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {

            let qweetChange = change.doc.data();
            qweetChange.id = change.doc.id;

            if (change.type === "added") {
                // console.log("New tweet: ", qweetChange);
                this.tweets.unshift(qweetChange);
            }
            if (change.type === "modified") {
                // console.log("Modified tweet: ", qweetChange);

                let index = this.tweets.findIndex(tweet => tweet.id === qweetChange.id);
                Object.assign(this.tweets[index], qweetChange);

            }
            if (change.type === "removed") {
                // console.log("Removed tweet: ", qweetChange);

                let index = this.tweets.findIndex(tweet => tweet.id === qweetChange.id);

                this.tweets.splice(index, 1);

            }
        });
    });
  }
})
</script>

<style lang="scss">
.new-tweet {
  
  textarea {
    font-size: 19px;
    line-height: 1.4 !important;
  }
}

.section-separator {
  border-top: 1px solid ;
  border-bottom: 1px solid;
  border-color: $grey-3;
}

.tweet-content {
  white-space: pre-wrap;
}

.qweet-icons {
  margin-left: -5px;
}

.tweet:not(:first-child) {
  border-top: 1px solid rgba(0, 0, 0, 0.12)
}
</style>
