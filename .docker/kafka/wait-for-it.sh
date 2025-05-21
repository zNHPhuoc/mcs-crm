#!/bin/bash

host="$1"
shift
port="$1"
shift

echo "Waiting for $host:$port to be available..."

while ! nc -z $host $port; do
  sleep 1
done

echo "$host:$port is available. Running command..."
exec "$@"
