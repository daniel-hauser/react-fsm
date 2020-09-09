export "$(grep -v '^#' ../.env | xargs)"
echo "Sending examples.json to ${REACT_APP_EXAMPLES_API}"

curl -X POST REACT_APP_EXAMPLES_API \
    -H 'content-type: application/json' \
    -d "@../src/examples/examples.json"
