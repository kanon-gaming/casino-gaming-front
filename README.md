# Kanon Gaming

This is a Front End React project

## Dependencies

1. Docker

> Download and install [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/) following the documentation and use Linux Containers.

## Installation

1. Create a folder named `KanonGaming` or a name of your choice

2. Open the CMD inside the `KanonGaming` folder

3. Use the `git clone` command to clone the 3 repositories

```
    git clone https://github.com/kanon-gaming/casino-gaming-front.git

    git clone https://github.com/kanon-gaming/casino-gaming-api.git

    git clone https://github.com/kanon-gaming/casino-gaming-database.git
```

4. Copy the `docker-compose.yaml` file into the folder `KanonGaming` created initially 

5. Use the `docker-compose up` command to clone the 3 repositories

```
    docker-compose up -d --build
```

>If you wish, you can change the access ports so as not to conflict with other services on your equipment. 
>To change just go to the `docker-compose.yaml` file and change the first part of the port. Example: "`your-port`:3000"

## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```
