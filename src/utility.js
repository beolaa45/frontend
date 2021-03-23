// Example POST method implementation:
export async function post(url = '', data = {}, headers= {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        ...headers
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  // Example POST method implementation:
export async function get(url = '', headers = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      ...headers
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    
   // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function deleted(url, headers = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      ...headers
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    
   // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function put(url = '', data = {}, headers= {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      ...headers
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export const setItemLocalStorage = (name, obj) => {
  localStorage.setItem(name, JSON.stringify(obj))
}

export const getItemLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name)) 
}

export const removeItemLocalStorage = (name) => {
  localStorage.removeItem(name)
}