import React, { ChangeEvent, useCallback } from "react";
import {
  Card,
  Input,
  Pagination,
  Row,
  Col,
  Empty,
  Typography,
  Flex,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useGetCharacters } from "../../services/hooks/useGetCharacters.ts";
import { useParamsStore } from "../../stores/paramsStore.ts";
import debounce from "../../utils/debounce.ts";
import { MainLoader } from "../../components/MainLoader";
const { Paragraph, Text } = Typography;

const CharacterList: React.FC = () => {
  const { page, setPage, search, setSearch } = useParamsStore();
  const navigate = useNavigate();

  const { data, isLoading } = useGetCharacters({ page, search });

  const handleSearch = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      setPage(1);
    }, 500),
    [],
  );

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <Flex vertical gap="middle">
      <Input
        autoFocus
        placeholder="Search characters..."
        defaultValue={search}
        onChange={handleSearch}
      />

      {!data?.results.length ? (
        <Flex justify="center" align="center" className="no-characters-wrapper">
          <Empty description="No characters found" />
        </Flex>
      ) : (
        <Row gutter={[16, 16]}>
          {data?.results.map((character) => {
            return (
              <Col xs={24} sm={12} md={8} lg={6} key={character.url}>
                <Card
                  hoverable
                  onClick={() =>
                    navigate(
                      `/character/${character.url.split("/").slice(-2, -1)[0]}`,
                    )
                  }
                  title={character.name}
                >
                  <Paragraph>
                    <Text strong>Birth Year:</Text> {character.birth_year}
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Gender:</Text> {character.gender}
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Height:</Text> {character.height}cm
                  </Paragraph>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <Flex justify="center">
        <Pagination
          current={page}
          total={data?.count || 0}
          pageSize={10}
          onChange={setPage}
          showSizeChanger={false}
        />
      </Flex>
    </Flex>
  );
};

export default CharacterList;
