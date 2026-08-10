document.addEventListener("DOMContentLoaded", () => {
  const SELECTED_CLASS = "guinect-selected";
  const COMPLETED_CLASS = "guinect-survey-completed";

  const surveyOptionSelector = [
    ".green_survey_option",
    ".yellow_survey_option",
    ".red_survey_option",
    ".neutral_survey_option",
  ].join(", ");

  /*
   * 1. Selección múltiple de tarjetas con iconos
   */
  document
    .querySelectorAll(".multiple_options_wrap .button")
    .forEach((option) => {
      option.setAttribute("role", "checkbox");
      option.setAttribute("aria-checked", "false");
      option.setAttribute("tabindex", "0");

      const toggleIconOption = () => {
        const isSelected = option.classList.toggle(SELECTED_CLASS);
        option.setAttribute("aria-checked", String(isSelected));
      };

      option.addEventListener("click", toggleIconOption);

      option.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleIconOption();
        }
      });
    });

  /*
   * 2. Opciones verdes, amarillas, rojas y neutrales
   */
  document.querySelectorAll(surveyOptionSelector).forEach((option) => {
    option.setAttribute("role", "checkbox");
    option.setAttribute("aria-checked", "false");

    option.addEventListener("click", (event) => {
      event.preventDefault();

      const surveyBlock = option.closest(".semaforo_survey");
      const isSingleChoice =
        surveyBlock && surveyBlock.classList.contains("single_choice");

      /*
       * En preguntas de respuesta única, elimina primero
       * cualquier otra opción seleccionada en esa pregunta.
       */
      if (isSingleChoice) {
        surveyBlock
          .querySelectorAll(`${surveyOptionSelector}.${SELECTED_CLASS}`)
          .forEach((selectedOption) => {
            selectedOption.classList.remove(SELECTED_CLASS);
            selectedOption.setAttribute("aria-checked", "false");
          });

        option.classList.add(SELECTED_CLASS);
        option.setAttribute("aria-checked", "true");
        return;
      }

      /*
       * En las demás preguntas se permiten varias respuestas.
       */
      const isSelected = option.classList.toggle(SELECTED_CLASS);
      option.setAttribute("aria-checked", String(isSelected));
    });
  });

  /*
   * 3. Estilo y funcionamiento de los botones "Enviar"
   */
  document.querySelectorAll(".survey_button").forEach((submitButton) => {
    submitButton.classList.add("guinect-submit-button");

    submitButton.addEventListener("click", (event) => {
      event.preventDefault();

      const currentPanel = submitButton.closest(".w-tab-pane");

      if (!currentPanel) {
        return;
      }

      const tabName = currentPanel.getAttribute("data-w-tab");

      if (!tabName) {
        return;
      }

      const matchingTab = Array.from(
        document.querySelectorAll(".survey_tab_link")
      ).find((tab) => tab.getAttribute("data-w-tab") === tabName);

      if (matchingTab) {
  matchingTab.classList.add(COMPLETED_CLASS);
}

let confirmationMessage =
  currentPanel.querySelector(".guinect-confirmation-message");

if (!confirmationMessage) {
  confirmationMessage = document.createElement("div");
  confirmationMessage.className = "guinect-confirmation-message";
  confirmationMessage.textContent =
    "Gracias. Tus respuestas fueron recibidas correctamente.";

  submitButton.insertAdjacentElement("afterend", confirmationMessage);
}

confirmationMessage.classList.add("is-visible");
    });
  });
});

/* ==================================================
   GUINECT COMMENT BOX
================================================== */

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".comment_box").forEach(function (commentBox, index) {
    const form = commentBox.querySelector(".comment_form");
    const textarea = commentBox.querySelector(".write_coment");
    const wrapper = commentBox.querySelector(".comentbox_wrapper");

    if (!textarea || !wrapper) return;

    let commentsList = commentBox.querySelector(".comments_list");

    if (!commentsList) {
      commentsList = document.createElement("div");
      commentsList.className = "comments_list";
      wrapper.appendChild(commentsList);
    }

    const storageKey = "guinect_comments_" + index;

    let savedComments = [];

    try {
      savedComments = JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch (error) {
      savedComments = [];
    }

    savedComments.forEach(function (comment) {
      renderComment(commentsList, comment);
    });

    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        publishComment();
      });
    }

    textarea.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        publishComment();
      }
    });

    function publishComment() {
      const commentText = textarea.value.trim();

      if (!commentText) {
        return;
      }

      const comment = {
        author: "Vecino",
        text: commentText,
        createdAt: new Date().toLocaleString(),
      };

      renderComment(commentsList, comment);

      savedComments.unshift(comment);
      localStorage.setItem(storageKey, JSON.stringify(savedComments));

      textarea.value = "";
    }
  });

  function renderComment(container, comment) {
    const commentCard = document.createElement("div");
    commentCard.className = "published_comment";

    const author = document.createElement("div");
    author.className = "published_comment_author";
    author.textContent = comment.author || "Vecino";

    const text = document.createElement("div");
    text.className = "published_comment_text";
    text.textContent = comment.text || "";

    const date = document.createElement("div");
    date.className = "published_comment_date";
    date.textContent = comment.createdAt || "";

    commentCard.appendChild(author);
    commentCard.appendChild(text);
    commentCard.appendChild(date);

    container.prepend(commentCard);
  }
});