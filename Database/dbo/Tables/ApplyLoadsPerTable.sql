CREATE TABLE [dbo].[ApplyLoadsPerTable] (
    [ApplyLoadsPer_ID] INT            IDENTITY (1, 1) NOT NULL,
    [ApplyLoadsPer]    NVARCHAR (150) NULL,
    CONSTRAINT [PK_ApplyLoadsPerTable] PRIMARY KEY CLUSTERED ([ApplyLoadsPer_ID] ASC)
);

