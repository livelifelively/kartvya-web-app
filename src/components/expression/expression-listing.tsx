import React, { useState, useEffect } from 'react';
import { Button, Loader, Alert, Stack } from '@mantine/core';
import ExpressionItem, { Expression } from './expression';

interface ExpressionListProps {
  expressions: Expression[];
  isChildList?: boolean;
  parentId?: string | null;
}

const ExpressionList: React.FC<ExpressionListProps> = ({
  expressions: initialExpressions,
  isChildList = false,
  parentId = null,
}) => {
  const [expressions, setExpressions] = useState<Expression[]>(initialExpressions);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialExpressions.length === 0) {
      fetchExpressions();
    }
  }, [initialExpressions]);

  const fetchExpressions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API call
      const response = await fetch(`/api/expressions${isChildList ? `?parentId=${parentId}` : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch expressions');
      }
      const data: Expression[] = await response.json();
      setExpressions(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadLatestExpressions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API call for loading latest expressions
      const response = await fetch(
        `/api/expressions/latest${isChildList ? `?parentId=${parentId}` : ''}`
      );
      if (!response.ok) {
        throw new Error('Failed to load latest expressions');
      }
      const data: Expression[] = await response.json();
      setExpressions((prevExpressions) => [...data, ...prevExpressions]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap="md">
      {loading && <Loader />}
      {error && <Alert color="red">{error}</Alert>}
      <Stack gap="sm">
        {expressions.map((expression) => (
          <ExpressionItem key={expression.id} expression={expression} />
        ))}
      </Stack>
      <Button onClick={loadLatestExpressions} variant="outline" style={{ alignSelf: 'center' }}>
        Load Latest
      </Button>
    </Stack>
  );
};

export default ExpressionList;
