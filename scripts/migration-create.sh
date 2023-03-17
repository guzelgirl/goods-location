#!/bin/bash

docker exec interview-task-server-1 bash -c "yarn typeorm migration:create src/migrations/${1}"