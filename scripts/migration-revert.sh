#!/bin/bash

docker exec interview-task-server-1 bash -c "yarn typeorm -d dist/src/data-source.js migration:revert"