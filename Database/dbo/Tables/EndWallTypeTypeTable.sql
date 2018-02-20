CREATE TABLE [dbo].[EndWallTypeTypeTable] (
    [EndWallTypeType_ID] INT            IDENTITY (1, 1) NOT NULL,
    [EndWallTypeType]    NVARCHAR (150) NULL,
    CONSTRAINT [PK_EndWallTypeTypeTable] PRIMARY KEY CLUSTERED ([EndWallTypeType_ID] ASC)
);

