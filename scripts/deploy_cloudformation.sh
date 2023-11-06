#!/bin/bash

STACK_NAME="redwood-stencil-auth0-stack"
TEMPLATE_FILE="infrastructure/aws/cloudformation_stack.yml"

# Helper function to get the current stack status
get_stack_status() {
  aws cloudformation describe-stacks --stack-name "$STACK_NAME" --query 'Stacks[0].StackStatus' --output text 2>/dev/null
}

# Initial stack status check
STACK_STATUS=$(get_stack_status)

# Loop until the stack is in a stable state or does not exist
while [[ $STACK_STATUS == *"_IN_PROGRESS" ]]; do
  echo "Waiting for stack to complete the current operation (status: $STACK_STATUS)..."
  sleep 10
  STACK_STATUS=$(get_stack_status)
done

# If the stack is in ROLLBACK_COMPLETE state, delete it
if [ "$STACK_STATUS" == "ROLLBACK_COMPLETE" ]; then
  echo "Stack is in ROLLBACK_COMPLETE state. Deleting..."
  if aws cloudformation delete-stack --stack-name "$STACK_NAME"; then
    echo "Waiting for stack to be deleted..."
    aws cloudformation wait stack-delete-complete --stack-name "$STACK_NAME"
  else
    echo "Failed to delete stack." >&2
    exit 1
  fi
elif [[ -z "$STACK_STATUS" ]]; then
  echo "Stack does not exist. Creating..."
  # Deploy the stack
  if ! aws cloudformation deploy \
    --template-file "$TEMPLATE_FILE" \
    --stack-name "$STACK_NAME" \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --no-fail-on-empty-changeset; then
    echo "Stack deployment failed." >&2
    exit 1
  fi
  echo "Stack deployed successfully."
else
  echo "Stack is in $STACK_STATUS state."
fi
