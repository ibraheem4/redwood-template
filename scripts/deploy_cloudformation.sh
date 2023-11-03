#!/bin/bash

STACK_NAME="redwood-stencil-auth0-stack"
TEMPLATE_FILE="infrastructure/aws/cloudformation_stack.json"

# Helper function to get the current stack status
get_stack_status() {
  aws cloudformation describe-stacks --stack-name $STACK_NAME --query 'Stacks[0].StackStatus' --output text 2>/dev/null
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
  aws cloudformation delete-stack --stack-name $STACK_NAME

  echo "Waiting for stack to be deleted..."
  aws cloudformation wait stack-delete-complete --stack-name $STACK_NAME
elif [ -z "$STACK_STATUS" ]; then
  echo "Stack does not exist. Creating..."
else
  echo "Stack is in $STACK_STATUS state."
fi

# Deploy the stack
echo "Deploying the stack..."
aws cloudformation deploy \
  --template-file $TEMPLATE_FILE \
  --stack-name $STACK_NAME \
  --capabilities CAPABILITY_NAMED_IAM \
  --no-fail-on-empty-changeset
