# Run app locally

- Clone the repo

  ```bash
  $ git clone https://github.com/francislagares/dogecoin-wallet.git
  ```

- Install the dependencies by running the following command.

  ```bash
  yarn install
  ```

- Start the development server:

  ```bash
  yarn dev
  ```

  Open [http://localhost:3000](http://localhost:3000) with your browser to see
  the result.

# Log inside the app

## Login Credentials

Email: dogecoin@test.com

Pass: 1234

# Run app with Docker

- Building an image

  ```bash
  $ docker build -t dogecoin-wallet:latest .
  ```

- Running a container

  ```bash
  $ docker run -p 3000:3000 dogecoin-wallet:latest
  ```

  Open [http://localhost:3000](http://localhost:3000) with your browser to see
  the result.

- Stopping a container

  ```bash
  $ docker stop dogecoin-wallet:latest
  ```

# Author

Created by [@francislagares](https://www.linkedin.com/in/francislagares/) - feel
free to contact me!

-
