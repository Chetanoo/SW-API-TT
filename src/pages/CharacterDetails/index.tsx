import React, { useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Flex, Result } from "antd";
import { Character, CharacterResponse } from "../../types";
import { useParamsStore } from "../../stores/paramsStore.ts";
import { BackButton } from "../../components/BackButton";
import { queryClient } from "../../queryClient.ts";

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { page, search } = useParamsStore();

  const cachedData = useMemo(
    () =>
      queryClient.getQueryData<CharacterResponse>(["characters", page, search]),
    [page, search],
  );

  const character = useMemo(
    () =>
      cachedData?.results.find((char) => {
        const charId = char.url.split("/").slice(-2, -1)[0];
        return charId === id;
      }),
    [cachedData, id],
  );

  const handleSubmit = useCallback(
    (values: Character) => {
      if (character) {
        const queries = queryClient
          .getQueryCache()
          .findAll({ queryKey: ["characters"] });

        queries.forEach(({ queryKey }) => {
          queryClient.setQueryData(
            queryKey,
            (oldData: CharacterResponse | undefined) => {
              if (!oldData) return oldData;

              return {
                ...oldData,
                results: oldData.results.map((char) =>
                  char.url === character.url ? { ...char, ...values } : char,
                ),
              };
            },
          );
        });

        navigate("/");
      }
    },
    [character],
  );

  if (!character) {
    return (
      <Result
        status="info"
        title="Not Found"
        subTitle="Sorry,Character not found."
        extra={<BackButton />}
      />
    );
  }

  return (
    <Flex justify="center" className="details-card">
      <Card title={`Edit ${character.name}`}>
        <Form
          form={form}
          initialValues={character}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Height" name="height">
            <Input />
          </Form.Item>
          <Form.Item label="Mass" name="mass">
            <Input />
          </Form.Item>
          <Form.Item label="Hair Color" name="hair_color">
            <Input />
          </Form.Item>
          <Form.Item label="Skin Color" name="skin_color">
            <Input />
          </Form.Item>
          <Form.Item label="Eye Color" name="eye_color">
            <Input />
          </Form.Item>
          <Form.Item label="Birth Year" name="birth_year">
            <Input />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Input />
          </Form.Item>

          <Flex gap={4}>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
            <BackButton />
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
};

export default CharacterDetail;
