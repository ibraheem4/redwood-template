#!/bin/bash

STACK_NAME="redwood-stencil-auth0-stack"

# Check if the stack exists and get its status
STACK_STATUS=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query 'Stacks[0].StackStatus' --output text)

# If the stack is in ROLLBACK_COMPLETE state, delete it
if [ "$STACK_STATUS" == "ROLLBACK_COMPLETE" ]; then
  echo "Stack is in ROLLBACK_COMPLETE state. Deleting..."
  aws cloudformation delete-stack --stack-name $STACK_NAME

  echo "Waiting for stack to be deleted..."
  aws cloudformation wait stack-delete-complete --stack-name $STACK_NAME
fi

# Deploy the stack
echo "Deploying the stack..."
aws cloudformation deploy \
  --template-file infrastructure/aws/cloudformation_stack.json \
  --stack-name $STACK_NAME \
  --capabilities CAPABILITY_NAMED_IAM \
  --no-fail-on-empty-changeset
