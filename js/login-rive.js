const { Alignment, Fit, Layout, Rive, RuntimeLoader } = window.rive || {};

const canvas = document.getElementById("rive-canvas");
const form = document.getElementById("login-form");
const username = form?.elements.username;
const password = form?.elements.password;
const loginButton = form?.querySelector(".login-btn");

const validDemoUser = "demo@demo.com";
const validDemoPass = "demo123";
const stateTriggerMap = {
  "hard stop": "isHardstop",
  disagree: "isDisagree",
  "embarassed transition": "isEmbarassed",
  empathy: "isEmpathetic",
  amazeamazeamaze: "isAmaze",
  proud: "isProud",
  delight: "isDelighted",
  amused: "isAmused",
  listening: "islistening",
  "happy transition": "isHappy",
  "thinking loop": "isThinking",
};
const successStates = [
  "amazeamazeamaze",
  "proud",
  "delight",
  "amused",
  "listening",
  "happy transition",
];
const errorStates = ["hard stop", "disagree", "embarassed transition", "empathy"];
const passwordStates = ["thinking loop"];
const focusTriggers = ["islistening", "idle"];

let rive;

if (RuntimeLoader) {
  RuntimeLoader.setWasmUrl("https://unpkg.com/@rive-app/canvas@2.42.0/rive.wasm");
}

function getViewModelTrigger(name) {
  const vm = rive?.viewModelInstance;

  if (!vm || typeof vm.trigger !== "function") {
    return null;
  }

  try {
    return vm.trigger(name);
  } catch (error) {
    return null;
  }
}

function fireTrigger(name) {
  const triggerName = stateTriggerMap[name] || name;
  const vmTrigger = getViewModelTrigger(name);

  if (vmTrigger && typeof vmTrigger.trigger === "function") {
    vmTrigger.trigger();
    return true;
  }

  const mappedVmTrigger = getViewModelTrigger(triggerName);

  if (mappedVmTrigger && typeof mappedVmTrigger.trigger === "function") {
    mappedVmTrigger.trigger();
    return true;
  }

  const input = rive
    ?.stateMachineInputs?.("State Machine 5")
    ?.find((item) => item?.name === triggerName);

  if (input && typeof input.fire === "function") {
    input.fire();
    return true;
  }

  return false;
}

function fireFirst(names) {
  for (const name of names) {
    if (fireTrigger(name)) {
      return;
    }
  }
}

function fireRandom(names) {
  const randomName = names[Math.floor(Math.random() * names.length)];

  if (!fireTrigger(randomName)) {
    fireFirst(names);
  }
}

function setButtonState(text, disabled) {
  if (!loginButton) {
    return;
  }

  loginButton.textContent = text;
  loginButton.disabled = disabled;
}

function setValidationError(show) {
  username?.classList.toggle("input-error", show && !username.value.trim());
  password?.classList.toggle("input-error", show && !password.value.trim());
}

function notify(type, message) {
  if (window.alertify && typeof window.alertify[type] === "function") {
    window.alertify[type](message);
    return;
  }

  console[type === "error" ? "error" : "log"](message);
}

if (canvas && Rive) {
  rive = new Rive({
    src: "./resources/aira.riv",
    canvas,
    artboard: "aira artboard",
    stateMachines: ["State Machine 5"],
    autoplay: true,
    autoBind: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    onLoad: () => {
      rive.resizeDrawingSurfaceToCanvas();

      const playfulAnims = rive.viewModelInstance?.number?.("playfulanims");
      if (playfulAnims) {
        playfulAnims.value = 0;
      }
    },
    onLoadError: (error) => {
      console.error("No se pudo cargar aira.riv", error);
    },
  });
}

window.addEventListener("resize", () => {
  rive?.resizeDrawingSurfaceToCanvas();
});

username?.addEventListener("focus", () => fireRandom(focusTriggers));
password?.addEventListener("focus", () => fireFirst(passwordStates));
password?.addEventListener("input", () => {
  if (password.value.trim()) {
    fireFirst(passwordStates);
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const userValue = username.value.trim();
  const passValue = password.value.trim();

  if (!userValue || !passValue) {
    setValidationError(true);
    fireRandom(errorStates);
    notify("error", "Ingresa usuario y password.");
    return;
  }

  setValidationError(false);

  if (userValue === validDemoUser && passValue === validDemoPass) {
    setButtonState("Ingresando...", true);
    notify("success", "Login exitoso. Redirigiendo...");
    setTimeout(() => fireRandom(successStates), 250);
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1800);
    return;
  }

  setButtonState("Error", true);
  notify("error", "Usuario o password incorrecto.");
  setTimeout(() => fireRandom(errorStates), 250);
  setTimeout(() => setButtonState("Login", false), 1500);
});
