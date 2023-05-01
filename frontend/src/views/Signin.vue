<template>
  <!---
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          isBlur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
          v-bind:darkMode="true"
          isBtn="bg-gradient-success"
        />
      </div>
    </div>
  </div> 
  ---->
  <main class="mt-0 main-content">
    <section>
      <div
        id="carouselExample"
        class="carousel slide"
        style="position: relative"
      >
        <div class="carousel-inner" style="height: 900px">
          <div class="carousel-item active text-center">
            <img
              src="https://images7.alphacoders.com/849/849213.png"
              class=""
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/fed1ce103851325.5f565e52a35a3.png"
              class=""
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/0792e5107891311.5fb1df968fe7a.jpg"
              class=""
              alt="..."
            />
          </div>
        </div>
        <div class="row ps-5" style="position: absolute; top: 0px;height: 900px">
          <div class="col">
            <div class="card h-100">
              <argon-alert color="warning" :disabled="passwordDisabled">
                <strong>Upsss!</strong> Your password is wrong!
              </argon-alert>
              <argon-alert color="danger" :disabled="emailDisabled">
                <strong>Upsss!</strong> this account {{ email }} not exists!
              </argon-alert>
              <div class="pb-0 card-header text-start">
                <h4 class="font-weight-bolder">Sign In</h4>
                <p class="mb-0">Enter your email and password to sign in</p>
              </div>
              <div class="card-body">
                <form role="form" @submit.prevent="submit()">
                  <div class="mb-3">
                    <argon-input
                      type="email"
                      placeholder="Email"
                      name="email"
                      size="lg"
                      isRequired
                      :modelValue="email"
                      @update:modelValue="(newValue) => (email = newValue)"
                    />
                  </div>
                  <div class="mb-3">
                    <argon-input
                      type="password"
                      placeholder="Password"
                      name="password"
                      size="lg"
                      isRequired
                      :modelValue="password"
                      @update:modelValue="(newValue) => (password = newValue)"
                    />
                  </div>
                  <argon-switch
                    :modelValue="rememberme"
                    @update:modelValue="(newValue) => (rememberme = newValue)"
                    >Remember me</argon-switch
                  >

                  <div class="text-center">
                    <argon-button
                      class="mt-4"
                      variant="gradient"
                      color="dark"
                      fullWidth
                      size="lg"
                      >Sign in</argon-button
                    >
                  </div>
                </form>
              </div>
              <div class="card-footer px-1 pt-0 text-center px-lg-2">
                <p class="mx-auto mb-4 text-sm">
                  Don't have an account?
                  <a
                    href="/signup"
                    class="text-dark text-gradient font-weight-bold"
                    >Sign up</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  </main>
</template>

<script>
//import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import Login from "../services/LoginService";
import ArgonAlert from "@/components/ArgonAlert.vue";
const body = document.getElementsByTagName("body")[0];

import { mapMutations } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      rememberme: false,
      passwordDisabled: false,
      emailDisabled: false,
    };
  },
  methods: {
    ...mapMutations(["makelogin", "setToken"]),
    async submit() {
      const getInfoForLogin = await Login.sendLogin(this.$data);
      console.log(getInfoForLogin);
      if (getInfoForLogin.user) {
        if (getInfoForLogin.login) {
          this.passwordDisabled = false;
          this.emailDisabled = false;
          // Tu lógica de autenticación aquí
          const token = getInfoForLogin.token;
          const roleToken = getInfoForLogin.tokenRole;
          // Luego de autenticar correctamente, guardar el token en el store
          this.setToken(token);
          localStorage.setItem("roleToken", roleToken);
          // Si se marcó el remember me, guardar un cookie con el token
          if (this.rememberme) {
            const cookieValue = encodeURIComponent(token);
            document.cookie = `rememberMe=${cookieValue};max-age=${
              60 * 60 * 24 * 7
            }`;
          }

          // Redirigir al dashboard
          this.$store.dispatch("login", token);
          this.$router.push("/dashboard");
        } else {
          this.passwordDisabled = true;
          this.emailDisabled = false;
        }
      } else {
        this.emailDisabled = true;
        this.passwordDisabled = false;
      }
    },
  },
  name: "signin",
  components: {
    //Navbar,
    ArgonAlert,
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
