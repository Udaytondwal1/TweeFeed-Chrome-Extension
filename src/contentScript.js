setTimeout(() => {

  let parentElement = document.querySelector('div[data-testid="toolBar"]').parentElement;

  // Function to insert the icon Using Shadow root
  const insertIcon = () => {
    if (parentElement.querySelector("#shadowroot") == null) {
      var div = document.createElement("div");
      div.textContent = "hello im div";
      div.id = "shadowroot";
      parentElement.insertAdjacentElement("afterbegin", div);
      var shadowRoot = div.attachShadow({ mode: 'open' });
      var shadowElement = document.createElement('div');
      shadowRoot.append(shadowElement);
      shadowElement.innerHTML = `
          <style>
            img {
               width: 25px;
               height: 25px;
               border-radius: 50%;
               margin: auto;
               cursor: pointer;
            }
          </style>
          <img id="icon" src="https://lh3.googleusercontent.com/Dqpl_PK7vA7ONN_oC2IZbP2TKbmfROOBLCv12daMvYIQrhlvfltuzLlu8t6eJR_73wATdlnHllYtkn0EAAQFQ9k3=s60" />
        `;

      var button = shadowRoot.querySelector('#icon');
      // Add click event listener for alert the Tweet Text and insert it on Tweet Text Area
      button.addEventListener('click', () => {
        const tweetText = document.querySelector('[data-testid="tweetText"]').textContent;
        let tweetTextArea;
        if (document.querySelector('[data-text="true"]')) {
          tweetTextArea = document.querySelector('[data-text="true"]');
        } else if (document.querySelector('[data-textid="tweetTextarea_0"]')) {
          tweetTextArea = document.querySelector('[data-textid="tweetTextarea_0"]');
        }
        alert(tweetText);
        setInputText(tweetTextArea, tweetText);
      });
    }
  };

  // Insert the icon immediately
  insertIcon();
  
  // Add Tweet Text to Tweet Area
  const setInputText = async (element, text) => {
    const range = document.createRange();
    const selection = window.getSelection();
    element.focus();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('insertHTML', false, text);
  };

  // Function to handle mutations
  function handleMutations(mutations) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.querySelector('div[data-testid="toolBar"]')) {
          console.log(node);
          insertIcon();
        }
      });
    });
  }

  // MutationObserver configuration
  const observerConfig = {
    childList: true,
    subtree: true,
  };

  // Create a MutationObserver instance
  const observer = new MutationObserver(handleMutations);

  // Start observing mutations on the document
  observer.observe(document.querySelector("#react-root"), observerConfig);

}, 1001); // Delaying the execution by 1 seconds to Fully Load the DOM.