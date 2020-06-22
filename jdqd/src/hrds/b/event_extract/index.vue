<template>
  <div>
    <indexAdmin v-if="flag=='1'" />
    <indexEditor v-if="flag=='0'" />
  </div>
</template>

<script>
import indexAdmin from "./indexadmin";
import indexEditor from "./indexeditor";
export default {
  components: {
    indexAdmin,
    indexEditor
  },
  data () {
    return {
      flag: sessionStorage.getItem("flag"),
    };
  },
  mounted(){
    
  },
  watch: {},
  created () {
  },
  computed: {},
  methods: {
    //handleFind () { }
  }
};
</script>
