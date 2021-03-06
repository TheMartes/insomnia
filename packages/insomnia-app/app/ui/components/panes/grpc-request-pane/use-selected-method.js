// @flow
import React from 'react';
import type { GrpcMethodDefinition, GrpcMethodType } from '../../../../network/grpc/method';
import {
  canClientStream,
  getMethodType,
  GrpcMethodTypeName,
} from '../../../../network/grpc/method';
import type { GrpcRequest } from '../../../../models/grpc-request';

type MethodSelection = {
  method?: GrpcMethodDefinition,
  methodType?: GrpcMethodType,
  methodTypeLabel?: string,
  enableClientStream?: boolean,
};

const useSelectedMethod = (
  methods: Array<GrpcMethodDefinition>,
  { _id, protoMethodName }: GrpcRequest,
): MethodSelection =>
  React.useMemo(() => {
    const selectedMethod = methods.find(c => c.path === protoMethodName);

    const methodType = selectedMethod && getMethodType(selectedMethod);
    const methodTypeLabel = GrpcMethodTypeName[methodType];
    const enableClientStream = canClientStream(methodType);

    return { method: selectedMethod, methodType, methodTypeLabel, enableClientStream };
  }, [methods, protoMethodName]);

export default useSelectedMethod;
