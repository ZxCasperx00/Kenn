document.getElementById('agreeCheckbox').addEventListener('change', function() {
  document.getElementById('submitButton').disabled = !this.checked;
});
let Commands = [{
  'commands': []
}, {
  'handleEvent': []
}];
function showAds() {
}

function States(){
  if (!Commands[0].commands.length) {
    return showResult('', 'Please provide at least one valid command for execution.', 'error');
  }
  if (document.getElementById('inputOf_BotName').value.length < 4){
    return showResult('', 'Bot name must be 4 characters minimum.', 'error');
  }
  if (document.getElementById('inputOf_Admin').value.length == 0){
    return showResult('', 'Admin User ID is needed.', 'error');
  }
  if (document.getElementById('inputOf_Admin').value.length < 4){
    return showResult('', 'Valid Admin User ID is needed.', 'error');
  }

  Swal.fire({
    title: "Warning",
    html: "If you use your main/personal account, I am not responsible if your account got locked, disabled or a checkpoint. We recommend using a dummy account. Click PROCEED to continue.",
    icon: "warning",
    confirmButtonColor: "#0061ff",
    confirmButtonText: "PROCEED"
  }).then((result) => {
    if (result.isConfirmed){
      State();
    }
  });
}
function measurePing() {
  var xhr = new XMLHttpRequest();
  var startTime, endTime;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      endTime = Date.now();
      var pingTime = endTime - startTime;
document.getElementById("ping").innerHTML = "Ping: " + pingTime + " ms" + " | Status: " + (pingTime > 200 ? "<font color=yellow>🟡 Good</font>" : "<font color=green>🟢 Stable</font>");
    }
  };
  xhr.open("GET", location.href + "?t=" + new Date().getTime());
  startTime = Date.now();
  xhr.send();
}
setInterval(measurePing,2*1000);

async function State() {
  const jsonInput = document.getElementById('json-data');
  const button = document.getElementById('submitButton');
  try {
    button.style.display = 'none';
    const State = JSON.parse(jsonInput.value);
    if (State && typeof State === 'object') {
      const response = await fetch('/Tanginamo3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: State,
          commands: Commands,
          prefix: document.getElementById('inputOf_Prefix').value == "" ? "/" : document.getElementById('inputOf_Prefix').value,
          admin: document.getElementById('inputOf_Admin').value,
          botname: document.getElementById('inputOf_BotName').value
        }),
      });
      const data = await response.json();
      if (data.success) {
        jsonInput.value = '';
        showResult('Success', data.message, 'success');
      } else {
        jsonInput.value = '';
        showResult('Something went wrong', data.message, 'question');
      }
    } else {
      jsonInput.value = '';
      showResult('Invalid JSON.', 'Please check your input.', 'error');
    }
  } catch (parseError) {
    jsonInput.value = '';
    showResult('Error parsing JSON.', 'Please check your input.', 'error');
  } finally {
    setTimeout(() => {
      button.style.display = 'block';
    }, 4000);
  }
}


function showResult(title, message, icon) {
  Swal.fire({
    title: title,
    html: message,
    icon: icon,
  //  showCancelButton: true,
    confirmButtonColor: "#0061ff",
  // cancelButtonColor: "#d33",
    confirmButtonText: "Okay"
  });
}

async function pangetMo(){
    const response = await fetch('/Tanginamo2');
    return response.json();
    }

async function commandList() {
  setTimeout(() => {
  showResult("", "PROJECT BOTIFY is <font color=red><b>strictly not for sale.</b></font><br>Please report via PM to me or the page Project Botify, You can use my site freely but don't abuse it.<br><b>Please support me. It will be really appreciated 🤍</b><br><br><a href=\"https://www.facebook.com/profile.php?id=61559180483340\">Click here to like &amp; follow Project Botify</a>", "");
  }, 1*1000);
  try {

    const [listOfCommands, listOfCommandsEvent] = [document.getElementById('listOfCommands'), document.getElementById('listOfCommandsEvent')];
    const response = await fetch('/Tanginamo2');
    const {
      commands,
      handleEvent,
      aliases
    } = await response.json();
    document.getElementById('listacmd').innerHTML = `Commands: ${commands.length}`;
    document.getElementById('listaevent').innerHTML = `Events: ${handleEvent.length}`;
    [commands, handleEvent].forEach((command, i) => {
      command.forEach((command, index) => {
        const container = createCommand(i === 0 ? listOfCommands : listOfCommandsEvent, index + 1, command, i === 0 ? 'commands' : 'handleEvent', aliases[index] || []);
        i === 0 ? listOfCommands.appendChild(container) : listOfCommandsEvent.appendChild(container);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function createCommand(element, order, command, type, aliases) {
  const container = document.createElement('div');
  container.classList.add('form-check', 'form-switch');
  container.onclick = toggleCheckbox;
  const checkbox = document.createElement('input');
  checkbox.classList.add('form-check-input', type === 'handleEvent' ? 'handleEvent' : 'commands');
  checkbox.type = 'checkbox';
  checkbox.role = 'switch';
  checkbox.id = `flexSwitchCheck_${order}`;
  const label = document.createElement('label');
  label.classList.add('form-check-label', type === 'handleEvent' ? 'handleEvent' : 'commands');
  label.for = `flexSwitchCheck_${order}`;
  label.innerHTML = `❌<font color=black>${order}. <b>${command}</b></font>`;
  container.appendChild(checkbox);
  container.appendChild(label);
  /*
  if (aliases.length > 0 && type !== 'handleEvent') {
    const aliasText = document.createElement('span');
    aliasText.classList.add('aliases');
    aliasText.textContent = ` (${aliases.join(', ')})`;
    label.appendChild(aliasText);
  }
  */
  return container;
}

function toggleCheckbox() {
  const box = [{
    input: '.form-check-input.commands',
    label: '.form-check-label.commands',
    array: Commands[0].commands
  }, {
    input: '.form-check-input.handleEvent',
    label: '.form-check-label.handleEvent',
    array: Commands[1].handleEvent
  }];
  box.forEach(({
    input,
    label,
    array
  }) => {
    const checkbox = this.querySelector(input);
    const labelText = this.querySelector(label);
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        labelText.innerHTML = labelText.innerHTML.replace('❌', '✅');
        const wiegine = labelText.textContent.replace("✅", "").replace("❌", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];

        array.push(command);
      } else {
        labelText.innerHTML = labelText.innerHTML.replace('✅', '❌');
        const wiegine = labelText.textContent.replace("✅", "").replace("❌", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];
        
        const removeCommand = array.indexOf(command);
        if (removeCommand !== -1) {
          array.splice(removeCommand, 1);
        }
      }
    }
  });
}

function selectAllCommands() {
  const box = [{
    input: '.form-check-input.commands',
    array: Commands[0].commands
  }];
  box.forEach(({
    input,
    array
  }) => {
    const checkboxes = document.querySelectorAll(input);
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    checkboxes.forEach((checkbox) => {
      if (allChecked) {
        checkbox.checked = false;
        const labelText = checkbox.nextElementSibling;
        labelText.innerHTML = labelText.innerHTML.replace('✅', '❌');
        const wiegine = labelText.textContent.replace("✅", "").replace("❌", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];
        
        const removeCommand = array.indexOf(command);
        if (removeCommand !== -1) {
          array.splice(removeCommand, 1);
        }
      } else {
        checkbox.checked = true;
        const labelText = checkbox.nextElementSibling;
        labelText.innerHTML = labelText.innerHTML.replace('❌', '✅');
        const wiegine = labelText.textContent.replace("✅", "").replace("❌", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];
        
        if (!array.includes(command)) {
          array.push(command);
        }
      }
    });
  });
}

function selectAllEvents() {
  const box = [{
    input: '.form-check-input.handleEvent',
    array: Commands[1].handleEvent
  }];
  box.forEach(({
    input,
    array
  }) => {
    const checkboxes = document.querySelectorAll(input);
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    checkboxes.forEach((checkbox) => {
      if (allChecked) {
        checkbox.checked = false;
        const labelText = checkbox.nextElementSibling;
        labelText.innerHTML = labelText.innerHTML.replace('✅', '❌');
        const wiegine = labelText.textContent.replace("✅", "").replace("❌", "");
        const event = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];
        
        const removeEvent = array.indexOf(event);
        if (removeEvent !== -1) {
          array.splice(removeEvent, 1);
        }
      } else {
        checkbox.checked = true;
        const labelText = checkbox.nextElementSibling;
        labelText.innerHTML = labelText.innerHTML.replace('❌', '✅');
        const wiegine = labelText.textContent.replace("✅", "").replace("❌", "");
        const event = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];
        if (!array.includes(event)) {
          array.push(event);
        }
      }
    });
  });
}

commandList();
      
