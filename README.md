# compilr-javascript
> Docker-based backend javascript compiler

## Installation
- Required [Docker](https://www.docker.com/)

### 1.) Download directly from Docker Hub

```bash
# download and run kykungz/compilr-javascript image in detached mode (port 8080)
docker run -p 8080:13570 -d --name compilr-javascript kykungz/compilr-javascript
```
After running the script above, you can now access your container using command:
```
docker exec -it compilr-javascript bash
```

### 2.) Clone and build new image (Configurable)

```bash
# clone the repository
git clone https://github.com/kykungz/compilr-javascript.git && cd compilr-javascript

# -----edit config.js file-----

# build an image
docker build -t kykungz/compilr-javascript .
# run kykungz/compilr-javascript image in detached mode (port 8080)
docker run -p 8080:13570 -d --name compilr-javascript kykungz/compilr-javascript
```
With this installation, you can configure the environment by editing `config.js` file before building an image. See [Configuration](#configuration)
below.
## Usage
compilr-javascript will create a simple API server on port 8080 by default. You can compile and run you code by sending a POST request to your https://localhost:8080/compile route, with a JSON request body similar to:
```javascript
// { "content": <code> }

{ "content": "let x = 10; console.log('hello world!' + x);" }
```
The response will be in JSON format with structure:
```javascript
// {
//    "success": <boolean>,
//    "output": <runnig_result>
// }

{
    "success": true,
    "output": "hello world!10\n"
}

```
If there is an error, success field will be `false` and the error output will be shown.
# Configuration
`config.js`

| Key     | Detail     |
| :------------- | :------------- |
| PORT       | Docker's port       |
| TIMEOUT       | Terminal cpu time limit (in seconds)       |
