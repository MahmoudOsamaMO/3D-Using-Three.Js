CREATE TABLE [dbo].[HeightReference_Table] (
    [ID_HeightReference] INT            IDENTITY (1, 1) NOT NULL,
    [HeightReference]    NVARCHAR (150) NULL,
    CONSTRAINT [PK_HeightReference_Table] PRIMARY KEY CLUSTERED ([ID_HeightReference] ASC)
);

