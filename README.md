# compilr-javascript
> Docker-based backend javascript compiler

## Installation
- Required [Docker](https://www.docker.com/)

```bash
# download and run kykungz/compilr-javascript image in detached mode (port 8080)
docker run -p 8080:8080 -d --name compilr-javascript kykungz/compilr-javascript
```

## Usage
After running above script, you can get access your container using command:
```
docker exec -it compilr-javascript bash
```
